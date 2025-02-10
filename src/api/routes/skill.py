from flask import Blueprint, jsonify, request

from api.models import db, Skill

skills_bp = Blueprint('skills_bp', __name__)

@skills_bp.route('/skills', methods=['POST'])
def create_skill():
    data = request.get_json()
    user_id = data.get('user_id')
    skill_type = data.get('skill_type')
    skill_category = data.get('skill_category')
    skill_subcategory = data.get('skill_subcategory')

    if not user_id or not skill_type or not skill_category or not skill_subcategory:
        return jsonify({"error": "Missing required fields"}), 400

    new_skill = Skill(user_id=user_id, skill_type=skill_type, skill_category=skill_category, skill_subcategory=skill_subcategory)
    db.session.add(new_skill)
    db.session.commit()

    return jsonify(new_skill.serialize()), 201
