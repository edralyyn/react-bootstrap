import numpy as np
import pandas as pd
import os
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.models import load_model

sequence_length = 90

def load_models(model_folder, num_models=4):
    models = []
    model_files = [file for file in os.listdir(model_folder) if file.endswith('.h5')][:num_models]
    for model_file in model_files:
        model_path = os.path.join(model_folder, model_file)
        models.append(load_model(model_path))
    return models

def preprocess_data(csv_file, num_days, models):
    df = pd.read_csv(csv_file, usecols=[0, 1, 2, 3, 4])
    if 'Event_encoded' not in df.columns:
        df['Event_encoded'] = LabelEncoder().fit_transform(df['Event ID'])

    new_sequence = df['Event_encoded'].values[-sequence_length:]

    for _ in range(num_days):
        new_sequence = np.append(new_sequence, 0)

    new_sequence = new_sequence[-sequence_length:]
    new_sequence = new_sequence.reshape(1, sequence_length, 1)

    all_predictions = []
    for model in models:
        predicted_probs = model.predict(new_sequence)
        predicted_label = np.argmax(predicted_probs)
        predicted_pid = df['Event ID'].unique()[predicted_label]
        all_predictions.append(predicted_pid)

    return all_predictions

def predict_folder(folder_path, num_days, models):
    predictions = []
    model_names = [os.path.splitext(model_path)[0] for model_path in os.listdir(model_folder) if model_path.endswith('.h5')]

    for filename in os.listdir(folder_path):
        if filename.endswith(".csv"):
            file_path = os.path.join(folder_path, filename)
            predicted_pids = preprocess_data(file_path, num_days, models)
            predictions.append((filename, predicted_pids))

    predictions_with_model_names = []
    for filename, predicted_pids in predictions:
        prediction_with_model_names = {'File': filename}
        for model_name, predicted_pid in zip(model_names, predicted_pids):
            prediction_with_model_names[model_name] = predicted_pid
        predictions_with_model_names.append(prediction_with_model_names)

    return predictions_with_model_names

if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    model_folder = os.path.join(current_dir, r'models')
    scan_folder = os.path.join(current_dir, r'System Logs')

    models = load_models(model_folder)
    
    # Ask for user input in the terminal
    num_days = int(input("Enter the number of days for prediction: "))

    predictions = predict_folder(scan_folder, num_days, models)
    for prediction in predictions:
        print(f"File: {prediction['File']}")
        print("Predicted PIDs:")
        for model_name, predicted_pid in prediction.items():
            if model_name != 'File':
                print(f"{model_name}: {predicted_pid}")
        print()
