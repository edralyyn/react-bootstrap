def add_numbers(num1, num2):
    return num1 + num2

if __name__ == "__main__":
    # Set the first number to 1
    number1 = 1

    # Read the second number (daysDifference) from the file
    try:
        with open('days_difference.txt', 'r') as f:
            number2 = float(f.read())
    except FileNotFoundError:
        print("The file days_difference.txt does not exist. Make sure the Flask app has received the days difference.")
    except ValueError:
        print("The file does not contain a valid number.")
    else:
        # Calculate the sum
        result = add_numbers(number1, number2)
        # Print the result
        print(f"The sum of {number1} and {number2} is {result}")
