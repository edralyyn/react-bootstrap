import socket
import os

# Define the host and port to listen on
HOST = 'Edralyn'  # Replace with your server IP or hostname
PORT = 5001  # Use a non-privileged port

# Create a socket object
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Bind the socket to the host and port
server_socket.bind((HOST, PORT))

# Listen for incoming connections
server_socket.listen(5)

print("Server is listening on port", PORT)

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
    logs_folder = os.path.join(os.getcwd(), "System Logs", "PC")
    if not os.path.exists(logs_folder):
        os.makedirs(logs_folder)

    # Save logs to a file in the "System Logs/PC" folder
    csv_file_path = os.path.join(logs_folder, filename)
    with open(csv_file_path, "wb") as csv_file:
        csv_file.write(logs)
    print(f"Logs received and saved as {filename} successfully in folder: {logs_folder}")

    # Close the connection
    client_socket.close()

# Close the server socket (this will never be reached in this example)
server_socket.close()
