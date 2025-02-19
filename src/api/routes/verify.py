from flask import Blueprint, jsonify, request, current_app
import jwt

verify_bp = Blueprint('verify', __name__)

@verify_bp.route('/verify', methods=['GET'])
def verify_token():
    token = request.cookies.get('access_token')
    if not token:
        return jsonify({"valid": False, "msg": "Token no encontrado"}), 401

    try:
        payload = jwt.decode(token, current_app.config['JWT_SECRET_KEY'], algorithms=["HS256"])
        return jsonify({"valid": True, "user": {"id": payload.get("id")}}), 200

    except jwt.ExpiredSignatureError:
        return jsonify({"valid": False, "msg": "Token expirado"}), 401

    except jwt.InvalidTokenError:
        return jsonify({"valid": False, "msg": "Token inválido"}), 401
