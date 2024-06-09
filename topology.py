import os

# Define the base directory and subdirectories
base_dir = 'System Logs'
sub_dirs = {
    'PC': 'PC',
    'Router': 'Router',
    'Switch': 'Switch'
}

def find_csv_files(base_dir, sub_dirs):
    csv_files = []
    for sub_dir, device_type in sub_dirs.items():
        full_path = os.path.join(base_dir, sub_dir)
        if os.path.exists(full_path):
            for file in sorted(os.listdir(full_path)):
                if file.endswith('.csv'):
                    csv_files.append((device_type, file))
    return csv_files

def print_topology(csv_files):
    if csv_files:
        result = "\nDevice Type                ID   IP Address\n"
        device_count = {'PC': 0, 'Router': 0, 'Switch': 0}
        for device_type, csv_file in csv_files:
            device_count[device_type] += 1
            device_id = device_count[device_type]
            ip_address = csv_file.replace('.csv', '')
            result += f"{device_type:25} {device_id:2}    {ip_address}\n"
        return result
    else:
        return "No CSV files found in the folders."

if __name__ == "__main__":
    csv_files = find_csv_files(base_dir, sub_dirs)
    print(print_topology(csv_files))
