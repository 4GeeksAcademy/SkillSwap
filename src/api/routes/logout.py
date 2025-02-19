from flask import Blueprint, jsonify, make_response

logout_bp = Blueprint('logout', __name__)

@logout_bp.route('/logout', methods=['POST'])
def logout():
    response = make_response(jsonify({"msg": "Logged out successfully"}))
    response.delete_cookie("access_token")
    return response, 200
