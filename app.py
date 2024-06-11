from flask import Flask, jsonify, request
from flask_cors import CORS
from topology import find_csv_files, print_topology
import os
import pandas as pd
import subprocess

app = Flask(__name__)
CORS(app)

server_process = subprocess.Popen(['python', 'server.py', '5001'])

@app.route('/', methods=['GET'])
def get_topology():
    base_dir = 'System Logs'
    sub_dirs = {
        'PC': 'PC',
    }
    if not os.path.exists(base_dir):
        return jsonify({'error': 'System Logs directory not found'}), 404

    csv_files = find_csv_files(base_dir, sub_dirs)
    topology_output = print_topology(csv_files)
    return jsonify({'topology': topology_output})

@app.route('/graph')
def line_graph_data():
    graph_data = generate_line_graph_data()
    if graph_data is None:
        return jsonify({'error': 'Failed to generate line graph data'}), 500
    print(f"Graph Data: {graph_data}")  # Debug print
    return jsonify(graph_data)

def generate_line_graph_data():
    current_dir = os.getcwd()
    system_logs_dir = os.path.join(current_dir, "System Logs")

    if not os.path.exists(system_logs_dir):
        print("System Logs folder not found.")
        return None

    sub_dirs = [d for d in os.listdir(system_logs_dir) if os.path.isdir(os.path.join(system_logs_dir, d))]
    combined_dfs = []

    for sub_dir in sub_dirs:
        folder_path = os.path.join(system_logs_dir, sub_dir)
        csv_files = [f for f in os.listdir(folder_path) if f.endswith('.csv')]

        dfs = []
        for file in csv_files:
            file_path = os.path.join(folder_path, file)
            df = pd.read_csv(file_path)
            dfs.append(df)

        if dfs:
            combined_df = pd.concat(dfs, ignore_index=True)
            combined_dfs.append(combined_df)

    if combined_dfs:
        final_combined_df = pd.concat(combined_dfs, ignore_index=True)
        column_name = 'Event ID'

        value_counts = final_combined_df[column_name].value_counts()
        sorted_values = value_counts.sort_index()

        data = {
            'x': sorted_values.index.tolist(),
            'y': sorted_values.values.tolist()
        }
        print(f"Generated Data: {data}")  # Debug print
        return data
    else:
        print("No CSV files found in subdirectories.")
        return None

if __name__ == '__main__':
    try:
        app.run(debug=True)
    finally:
        # Terminate server.py subprocess when Flask app terminates
        server_process.terminate()
