from flask import Blueprint, jsonify, request, make_response, current_app
from werkzeug.security import generate_password_hash
from datetime import datetime, timedelta
import jwt

from api.models import db, User

signup_bp = Blueprint('signup', __name__)

@signup_bp.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()

    # Validación básica de los datos recibidos
    # Se valida que se hayan enviado email, password, name y last_name
    if not body or not body.get('email') or not body.get('password') or not body.get('name') or not body.get('last_name'):
        return jsonify({"msg": "Email, password, name and last name are required"}), 400

    name = body.get('name')
    last_name = body.get('last_name')
    email = body['email']
    password = body['password']

    # Verifica si ya existe un usuario con ese email
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"msg": "User already exists"}), 400

    # Genera el hash de la contraseña
    hashed_password = generate_password_hash(password)

    # Crea y guarda el nuevo usuario, incluyendo name y last_name
    new_user = User(
        name=name,
        last_name=last_name,
        email=email,
        password=hashed_password,
        is_active=True
    )
    db.session.add(new_user)
    db.session.commit()

    # Genera un token JWT con una expiración de 1 día
    token = jwt.encode({
        'id': new_user.id,
        'exp': datetime.utcnow() + timedelta(days=1)
    }, current_app.config['JWT_SECRET_KEY'], algorithm="HS256")

    # Dependiendo de la versión de PyJWT, es posible que 'token' sea un byte string;
    # en ese caso, decodifícalo con: token = token.decode('utf-8')
    # Genera la respuesta y establece el token en una cookie
    response = make_response(jsonify({"msg": "User created"}))
    response.set_cookie(
        'access_token',
        token,
        httponly=True,
        secure=True,
        samesite='None'
    )

    return response
