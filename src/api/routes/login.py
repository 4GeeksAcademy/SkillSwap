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

    # Validación básica de los datos recibidos
    if not body or not body.get('email') or not body.get('password'):
        return jsonify({"msg": "Email and password are required"}), 400

    email = body.get('email')
    password = body.get('password')

    # Busca el usuario por email
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404

    # Verifica la contraseña utilizando el hash almacenado
    if not check_password_hash(user.password, password):
        return jsonify({"msg": "Invalid credentials"}), 401

    # Genera un token JWT con una expiración de 1 día utilizando la configuración de la app
    token = jwt.encode({
        'id': user.id,
        'exp': datetime.utcnow() + timedelta(days=1)
    }, current_app.config['JWT_SECRET_KEY'], algorithm="HS256")

    # Crea la respuesta y establece el token en una cookie
    response = make_response(jsonify({"msg": "Logged in successfully"}))
    response.set_cookie(
        'access_token',
        token,
        httponly=True,
        secure=True,
        samesite='None'
    )

    return response
