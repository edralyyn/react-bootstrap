import os
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.models import load_model

sequence_length = 90

def preprocess_data(csv_file, model):
    df = pd.read_csv(csv_file, usecols=[0, 1, 2, 3, 4])
    
    # Display the columns for debugging
    print(f"Processing {csv_file}:")
    print(df.columns)
    
    if 'Event ID' in df.columns:
        df['Event_encoded'] = LabelEncoder().fit_transform(df['Event ID'])
    else:
        print("'Event ID' column not found, skipping Event encoding.")
        
    if 'Id' in df.columns:
        df['Id_encoded'] = LabelEncoder().fit_transform(df['Id'])
    else:
        print("'Id' column not found, skipping Id encoding.")

    if 'Id_encoded' in df.columns:
        sequence_col = 'Id_encoded'
        unique_col = 'Id'
    elif 'Event_encoded' in df.columns:
        sequence_col = 'Event_encoded'
        unique_col = 'Event ID'
    else:
        raise ValueError("Neither 'Id' nor 'Event ID' found in the processed data.")

    new_sequence = df[sequence_col].values[-sequence_length:]

    # Padding sequence with zeros to match sequence length
    padding_length = sequence_length - len(new_sequence)
    new_sequence = np.pad(new_sequence, (padding_length, 0), 'constant')

    new_sequence = new_sequence.reshape(1, sequence_length, 1)

    predicted_probs = model.predict(new_sequence)
    predicted_label = np.argmax(predicted_probs)
    predicted_unique = df[unique_col].unique()[predicted_label]

    return predicted_unique

if __name__ == "__main__":
    # Get the current working directory
    current_dir = os.getcwd()

    # Provide the path to the models folder
    models_folder = os.path.join(current_dir, 'models')
    # Provide the path to the CSV folder
    csv_folder = os.path.join(current_dir, 'System Logs', 'PC')

    results = []

    # Loop through all CSV files in the folder
    for file in os.listdir(csv_folder):
        if file.endswith(".csv"):
            csv_file = os.path.join(csv_folder, file)
            file_results = [f"File: {file}"]
            # Loop through all model files in the models folder
            for model_file in os.listdir(models_folder):
                if model_file.endswith(".h5"):
                    model_path = os.path.join(models_folder, model_file)
                    try:
                        # Load the model
                        model = load_model(model_path)
                        # Process the CSV file with the model
                        predicted_pid = preprocess_data(csv_file, model)
                        # Ensure the output is saved without '.0'
                        file_results.append(f"Model {model_file}: {int(predicted_pid)}")
                    except Exception as e:
                        file_results.append(f"Model {model_file}: Error - {e}")
            results.append("\n".join(file_results))

    # Save the results to a text file in the current directory
    output_file = os.path.join(current_dir, 'forecast_output.txt')
    with open(output_file, "w") as f:
        f.write("\n\n".join(results))

    print(f"Results saved to {output_file}")
