from flask import Blueprint, jsonify, request

from api.models import User, Skill

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200

@user_bp.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify(user.serialize()), 200
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