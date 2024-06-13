from flask import Flask, jsonify, request
from flask_cors import CORS
from topology import find_csv_files, print_topology
import os
import pandas as pd
import subprocess
import schedule
import time
from threading import Thread, Lock


app = Flask(__name__)
CORS(app)


# Specify the full path to the Python interpreter in your virtual environment
python_executable = os.path.join(os.getcwd(), 'myenv', 'Scripts', 'python.exe')  # Adjust for your environment


# Start server.py subprocess
server_process = subprocess.Popen([python_executable, 'server.py', '5001'])


def run_file(filename):
    # Get the current directory
    current_dir = os.path.dirname(os.path.realpath(__file__))
   
    # Construct the full path to the file
    file_path = os.path.join(current_dir, filename)
   
    # Check if the file exists
    if os.path.exists(file_path):
        # Run the file using subprocess with the virtual environment's Python interpreter
        subprocess.run([python_executable, file_path])
    else:
        print(f"The file '{filename}' does not exist in the directory.")


# Define a lock
forecast_lock = Lock()

def run_periodically(filename, initial_delay_minutes, interval_hours):
    # Initial delay with logging
    for i in range(initial_delay_minutes * 1, 0, -1):  # Corrected to use 60 instead of 10 for minute-to-second conversion
        print(f"Time remaining before running {filename}: {i} seconds")
        time.sleep(1)
    
    # Acquire the lock before running the file
    with forecast_lock:
        # First run
        print(f"Running {filename} for the first time")
        run_file(filename)
        
        # Schedule subsequent runs
        schedule.every(interval_hours).hours.do(run_file, filename)
        
        # Run the scheduler loop
        while True:
            schedule.run_pending()
            time.sleep(1)  # Sleep for a short time to avoid high CPU usage

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


@app.route('/forecast', methods=['GET'])
def get_forecast():
    forecast_output_path = os.path.join(os.path.dirname(__file__), 'forecast_output.txt')
    forecast_data = {}


    with open(forecast_output_path, 'r') as file:
        current_file = None
        for line in file:
            if line.startswith('File:'):
                current_file = line.split(' ')[1].strip()
                forecast_data[current_file] = {}
            elif 'Model' in line:
                model, value = line.split(':')
                model = model.split(' ')[1].strip()
                forecast_data[current_file][model] = int(value.strip())


    return jsonify({'forecast': forecast_data})


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
            try:
                df = pd.read_csv(file_path)
                if 'Event ID' in df.columns:
                    column_name = 'Event ID'
                elif 'Id' in df.columns:
                    column_name = 'Id'
                else:
                    print(f"Skipping file '{file}' as neither 'Event ID' nor 'Id' found.")
                    continue
                dfs.append(df)
            except Exception as e:
                print(f"Error reading file '{file}': {str(e)}")


        if dfs:
            combined_df = pd.concat(dfs, ignore_index=True)
            combined_dfs.append(combined_df)


    if combined_dfs:
        final_combined_df = pd.concat(combined_dfs, ignore_index=True)
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
    # Run the forecast.py periodically in a separate thread
    forecast_thread = Thread(target=run_periodically, args=("forecast.py", 60, 1))  # 5-minute delay, 1-hour interval
    forecast_thread.start()

    try:
        
        app.run(debug=False)
    finally:
        # Terminate server.py subprocess when Flask app terminates
        server_process.terminate()
