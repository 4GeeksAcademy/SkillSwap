from flask import Blueprint, jsonify, request, make_response, current_app
from werkzeug.security import check_password_hash
from datetime import datetime, timedelta
import jwt

from api.models import User

login_bp = Blueprint('login', __name__)

@login_bp.route('/login', methods=['POST'])
def login():
    print("login")
    body = request.get_json()

    if not body or not body.get('email') or not body.get('password'):
        return jsonify({"msg": "Email and password are required"}), 400

    email = body.get('email')
    password = body.get('password')

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404

    if not check_password_hash(user.password, password):
        return jsonify({"msg": "Invalid credentials"}), 401

    token = jwt.encode({
        'id': user.id,
        'exp': datetime.utcnow() + timedelta(days=1)
    }, current_app.config['JWT_SECRET_KEY'], algorithm="HS256")

    response = make_response(jsonify({
        "auth": {
            "token": token,
            "isAuthenticated": True,
            "user": {
                "id": user.id,
                "email": user.email,
                "name": user.name
            }
        }
    }))

    response.set_cookie(
        'access_token',
        token,
        httponly=False,
        secure=True,
        samesite='None'
    )

    return response
