import pandas as pd
import os
import matplotlib.pyplot as plt
import plotly.express as px
import plotly.io as pio

def generate_line_graph():
    # Get the current directory
    current_dir = os.getcwd()

    # Define the path to the "System Logs" folder
    system_logs_dir = os.path.join(current_dir, "System Logs")

    # Check if the "System Logs" folder exists
    if os.path.exists(system_logs_dir):
        # Get a list of subdirectories within "System Logs"
        sub_dirs = [d for d in os.listdir(system_logs_dir) if os.path.isdir(os.path.join(system_logs_dir, d))]

        # Initialize an empty list to hold the combined DataFrames
        combined_dfs = []

        # Loop through each subdirectory
        for sub_dir in sub_dirs:
            # Define the path to the subdirectory
            folder_path = os.path.join(system_logs_dir, sub_dir)

            # List all CSV files in the subdirectory
            csv_files = [f for f in os.listdir(folder_path) if f.endswith('.csv')]

            # Initialize an empty list to hold individual DataFrames
            dfs = []

            # Loop through each CSV file in the subdirectory and read it into a DataFrame
            for file in csv_files:
                file_path = os.path.join(folder_path, file)
                df = pd.read_csv(file_path)
                dfs.append(df)

            # Concatenate all DataFrames into a single DataFrame for this subdirectory
            combined_df = pd.concat(dfs, ignore_index=True)
            combined_dfs.append(combined_df)

        # Combine the DataFrames from all subdirectories into a single DataFrame
        final_combined_df = pd.concat(combined_dfs, ignore_index=True)

        # Specify the column name
        column_name = 'Event ID'  # change this to your column name

        # Count the occurrences of each unique value in the column
        value_counts = final_combined_df[column_name].value_counts()

        # Sort the values based on their index (x-axis values) in ascending order
        sorted_values = value_counts.sort_index()

        # Create an interactive line plot with sorted x-axis values
        fig = px.line(x=sorted_values.index, y=sorted_values.values, labels={'x': 'Event ID', 'y': 'Occurrence'}, markers=True, line_shape='linear')
        fig.update_layout(title=f'Network {column_name} Occurrence',
                          xaxis_tickformat='d',  # Display large numbers without "k" notation, dots, and commas
                          yaxis_tickformat='d',  # Display large numbers without "k" and without comma separator
                          width=800,
                          height=300)

        # Convert the Plotly graph to HTML content
        graph_html = pio.to_html(fig, full_html=False)

        return graph_html
    else:
        # "System Logs" folder does not exist
        print("System Logs folder not found.")
        return None
