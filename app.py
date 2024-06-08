from flask import Flask, jsonify, request
from flask_cors import CORS
from topology import find_csv_files, print_topology
import input

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def get_topology():
    base_dir = 'System Logs'
    sub_dirs = {
        'End Devices': 'End Device',
        'Intermediary Devices': 'Intermediary Device'
    }
    csv_files = find_csv_files(base_dir, sub_dirs)
    topology_output = print_topology(csv_files)
    return jsonify({'topology': topology_output})

@app.route('/', methods=['POST'])
def post_days_difference():
    data = request.json
    days_difference = data.get('daysDifference')
    if days_difference is not None:
        print(f"Days Difference: {days_difference}")
        with open('days_difference.txt', 'w') as f:
            f.write(str(days_difference))
        return jsonify({'message': 'Days difference received'}), 200
    else:
        return jsonify({'message': 'No days difference provided'}), 400

if __name__ == '__main__':
    app.run(debug=True)
