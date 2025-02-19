from flask import Blueprint, jsonify, request
from api.models import User, Skill, db

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200

@user_bp.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        user_data = user.serialize()
        skills = Skill.query.filter_by(user_id=user.id).all()
        user_data["skills"] = [skill.serialize() for skill in skills]
        return jsonify(user_data), 200
    else:
        return jsonify({"error": "User not found"}), 404
    
@user_bp.route('/users/skills', methods=['GET'])
def get_users_with_skills():
    users = User.query.all()
    users_with_skills = []
    
    for user in users:
        user_data = user.serialize()
        skills = Skill.query.filter_by(user_id=user.id).all()
        user_data["skills"] = [skill.serialize() for skill in skills]
        users_with_skills.append(user_data)
    
    return jsonify(users_with_skills), 200

@user_bp.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    if not data:
        return jsonify({"error": "No input data provided"}), 400

    user.name = data.get('name', user.name)
    user.last_name = data.get('last_name', user.last_name)
    user.description = data.get('description', user.description)
    user.profile_pic_src = data.get('profile_pic_src', user.profile_pic_src)

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al actualizar el usuario", "message": str(e)}), 500

    return jsonify(user.serialize()), 200
