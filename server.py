import socket
import os
import sys
import threading
import time

# Define the host to listen on
HOST = 'Edralyn'  # Replace with your server IP or hostname
LOGS_FOLDER = os.path.join(os.getcwd(), "System Logs", "PC")
FILE_AGE_LIMIT = 3600  # 1 hour in seconds

def start_server(port):
    # Create a socket object
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    # Bind the socket to the host and port
    server_socket.bind((HOST, port))

    # Listen for incoming connections
    server_socket.listen(5)

    print("Server is listening on port", port)

    while True:
        # Accept incoming connections
        client_socket, client_address = server_socket.accept()
        print("Connection from:", client_address)

        # Receive the data from the client
        data = b""
        while True:
            packet = client_socket.recv(4096)  # Adjust buffer size as needed
            if not packet:
                break
            data += packet

        # Split the received data to extract the filename and logs
        data = data.split(b'\n', 1)
        filename = data[0].decode()  # Decode the filename from bytes to string
        logs = data[1]

        # Determine the folder to save logs
        if not os.path.exists(LOGS_FOLDER):
            os.makedirs(LOGS_FOLDER)

        # Modify filename to include the client's IP address
        client_ip = client_address[0]
        modified_filename = f"{client_ip}.csv"

        # Save logs to a file in the "System Logs/PC" folder
        csv_file_path = os.path.join(LOGS_FOLDER, modified_filename)
        with open(csv_file_path, "wb") as csv_file:
            csv_file.write(logs)
        print(f"Logs received and saved as {modified_filename} successfully in folder: {LOGS_FOLDER}")

        # Close the connection
        client_socket.close()

    server_socket.close()

def cleanup_old_files():
    while True:
        current_time = time.time()
        for filename in os.listdir(LOGS_FOLDER):
            file_path = os.path.join(LOGS_FOLDER, filename)
            if os.path.isfile(file_path):
                file_age = current_time - os.path.getmtime(file_path)
                if file_age > FILE_AGE_LIMIT:
                    os.remove(file_path)
                    print(f"Deleted old file: {filename}")

        # Sleep for a while before checking again
        time.sleep(3600)  # Check every hour

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python server.py <port>")
        sys.exit(1)
    port = int(sys.argv[1])

    # Start the file cleanup thread
    cleanup_thread = threading.Thread(target=cleanup_old_files, daemon=True)
    cleanup_thread.start()

    # Start the server
    start_server(port)
