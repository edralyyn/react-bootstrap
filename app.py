from flask import Flask, jsonify
from flask_cors import CORS
from topology import find_csv_files, print_topology

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

if __name__ == '__main__':
    app.run(debug=True)
