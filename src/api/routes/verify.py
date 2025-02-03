from flask import Blueprint, jsonify, request, current_app
import jwt

verify_bp = Blueprint('verify', __name__)

@verify_bp.route('/verify', methods=['GET'])
def verify_token():
    # Recupera el token desde las cookies
    token = request.cookies.get('access_token')
    if not token:
        return jsonify({"msg": "Token no encontrado"}), 401

    try:
        # Intenta decodificar el token usando la clave secreta configurada
        payload = jwt.decode(token, current_app.config['JWT_SECRET_KEY'], algorithms=["HS256"])
        # Si se decodifica correctamente, el token es válido
        return jsonify({"msg": "Token válido", "user_id": payload.get("id")}), 200

    except jwt.ExpiredSignatureError:
        # El token ha expirado
        return jsonify({"msg": "Token expirado"}), 401

    except jwt.InvalidTokenError:
        # El token es inválido
        return jsonify({"msg": "Token inválido"}), 401
