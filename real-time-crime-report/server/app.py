import time
from firebase_admin import credentials, db, auth, initialize_app
from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity


# Initialize Firebase Admin
cred = credentials.Certificate('server/firebase-auth.json')
initialize_app(cred, {
    'databaseURL': 'https://crime-mgmt-default-rtdb.firebaseio.com/'
})
app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app)
users_ref = db.reference('/users')
# JWT Setup
app.config['JWT_SECRET_KEY'] = 'AJFlkdfdnfd343bduhfuu3'
jwt = JWTManager(app)


@app.route('/login', methods=['POST'])
def login():
    """
    This function handles user login by verifying the provided credentials and generating an access
    token if they are valid.
    :return: The login function is returning a JSON response with an access token if the username and
    password provided in the request match the stored credentials in the database. If the credentials
    are invalid or an exception occurs during the process, a JSON response with an error message is
    returned along with a status code of 401 (Unauthorized).
    """
    username = request.json.get('username')
    password = request.json.get('password')
    try:
        user = auth.get_user_by_email(username)
        db_user = users_ref.child(user.uid).get()
        if user and bcrypt.check_password_hash(db_user.get('password'),password) :
            token = create_access_token(identity=user.uid)
            return jsonify(access_token=token)
        return jsonify({'message': f'Invalid credentials: {e}'}), 401
    except Exception as e:
        return jsonify({'message': f'Invalid credentials: {e}'}), 401

@app.route('/token-login', methods=['POST'])
def token_login():
    """
    The `token_login` function verifies a user's token, creates a new user if not found in the database,
    and returns user data if already exists.
    :return: The code snippet provided is a Flask route for handling token-based login. It verifies the
    ID token provided in the request, retrieves user data from Firebase Realtime Database based on the
    UID, and creates a new user if the user does not exist in the database.
    """
    try:
        decoded_token = auth.verify_id_token(request.json.get('credential'))
        uid = decoded_token['uid']
        email = decoded_token.get('email', False)
        user_data = users_ref.child(uid).get()
        if not user_data and email:
            user = auth.create_user(email=email,            )
            custom_token = create_access_token(identity=user.uid)
            users_ref.child(user.uid).set({
                'username': email,
                'password': '',
                'jwt_token': custom_token,
                'is_oauth':False
            })
            return jsonify({'message': 'User created', 'uid': uid, 'email': email}), 201
        else:
            # User exists, return existing data
            return jsonify({'message': 'User exists or provide the email', 'uid': uid, 'email': user_data['email']}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/token_sign_in', methods=['POST'])
def token_sign_in():
    """
    The `token_sign_in` function in this Python code snippet verifies an ID token received from the
    client, creates a custom JWT for user session management, and returns the JWT if the token is valid.
    :return: The `token_sign_in` function returns a JSON response containing a custom JWT (JSON Web
    Token) if the provided ID token is valid. If the ID token is successfully verified, a custom JWT is
    created for maintaining user sessions and returned in the JSON response with a status code of 200
    (OK). If there is an exception during the token verification process, a JSON response with a message
    indicating '
    """
    id_token = request.json.get('idToken')
    try:
        # Check the token received from the client
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        # Create a custom JWT for maintaining user sessions
        custom_token = create_access_token(identity=uid)
        return jsonify({'jwt': custom_token}), 200
    except Exception:
        return jsonify({'message': 'Invalid token'}), 401

@jwt_required()
def my_profile():
    """
    The function `my_profile` retrieves the profile data of the current user using JWT authentication.
    :return: The `my_profile` function is returning the user data for the current user in JSON format
    with a status code of 200 if the user is found. If the user is not found, it returns a JSON response
    with a message "User not found" and a status code of 404.
    """
    current_user = get_jwt_identity()
    user_ref = db.reference(f'/users/{current_user}')
    user_data = user_ref.get()
    if not user_data:
        return jsonify({'message': 'User not found'}), 404
    return jsonify(user_data), 200

@app.route('/signup', methods=['POST'])
def signup():
    """
    The `signup` function checks if a user already exists, creates a new user if not, and returns a
    response with the appropriate status code and message.
    :return: The `signup` function returns a JSON response with a message indicating whether the user
    creation was successful or if the user already exists. If the user already exists, it returns a 409
    status code along with the existing user's email. If the user is successfully created, it returns a
    201 status code along with a message confirming the successful creation and the user's unique
    identifier (uid). If an
    """
    username = request.json.get('username')
    password = request.json.get('password')

    try:
        user = auth.get_user_by_email(username)
        return jsonify({'message': f'User already exists: {user.email}'}), 409

    except auth.UserNotFoundError:
            user = auth.create_user(
                email=username,
                password=password
            )
            custom_token = create_access_token(identity=user.uid)
            users_ref.child(user.uid).set({
                'username': username,
                'password': bcrypt.generate_password_hash(password).decode('utf-8'),
                'jwt_token': custom_token,
                'is_oauth':True
            })
            return jsonify({'message': 'User created successfully', 'uid': user.uid}), 201
    except Exception as e:
        return jsonify({'message': f'User already exists: {e}'}), 409


# -----------------------------------------------------------------------------------
                # Get Report Data
# -----------------------------------------------------------------------------------

@app.route('/create_crime_report', methods=['POST'])
def create_report():
    """
    This function creates a new crime report by pushing data to a Firebase Realtime Database.
    :return: The `create_report` function is returning a JSON response with the ID of the newly created
    crime report object and the data that was pushed to the database. If the operation is successful, it
    returns a status code of 200. If an exception occurs during the process, it returns a JSON response
    with an error message and a status code of 401.
    """
    try:
        data = request.json
        ref = db.reference('/crime_report_data')
        crime_report_obj = ref.push(data)
        return jsonify({'id': crime_report_obj.key, 'data': data}), 200
    except Exception as e:
        return jsonify({'error': f"error: {e}"}), 401

def _get_reports(crime_report_id=False):
    """
    This Python function retrieves crime report data based on an optional crime report ID and handles
    errors appropriately.
    
    :param crime_report_id: The function `_get_reports` retrieves crime report data from a database. If
    a `crime_report_id` is provided, it fetches the specific report with that ID. If no ID is provided,
    it fetches all crime reports, defaults to False (optional)
    :return: The function `_get_reports` returns a JSON response containing either the record list of
    crime reports (if found) with a status code of 200, or an error message indicating that the record
    was not found with a status code of 404. If an exception occurs during the process, it returns an
    error message with a status code of 401.
    """
    try:
        ref = '/crime_report_data'
        error = "Record not found"
        if crime_report_id:
            ref += f'/{crime_report_id}'
            error += f" with id '{crime_report_id}' !"

        record_list = db.reference(ref).get()
        if record_list:
            return jsonify(record_list), 200

        return jsonify({"error": error}), 404
    except Exception as e:
        return jsonify({'error': f"error: {e}"}), 401

@app.route('/crime_report', methods=['GET'])
def get_report():
    return _get_reports()

@app.route('/crime_report/<crime_report_id>', methods=['GET'])
def get_specific_report(crime_report_id):
    return _get_reports(crime_report_id)

