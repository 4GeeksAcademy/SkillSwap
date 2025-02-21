from flask import Blueprint, jsonify, request
from api.models import db, Skill, SkillType, SkillCategory, SkillSubcategory

skills_bp = Blueprint('skills_bp', __name__)

@skills_bp.route('/skills', methods=['POST'])
def create_skill():
    data = request.get_json()
    user_id = data.get('user_id')

    try:
        skill_type = SkillType(data.get('skill_type'))
    except ValueError:
        return jsonify({"error": "Invalid skill_type"}), 400

    try:
        skill_category = SkillCategory(data.get('skill_category'))
    except ValueError:
        return jsonify({"error": "Invalid skill_category"}), 400

    try:
        skill_subcategory = SkillSubcategory(data.get('skill_subcategory'))
    except ValueError:
        return jsonify({"error": "Invalid skill_subcategory"}), 400

    if not user_id:
        return jsonify({"error": "Missing required fields"}), 400

    new_skill = Skill(
        user_id=user_id, 
        skill_type=skill_type, 
        skill_category=skill_category, 
        skill_subcategory=skill_subcategory
    )
    db.session.add(new_skill)
    db.session.commit()

    return jsonify(new_skill.serialize()), 201

@skills_bp.route('/skills/<int:skill_id>', methods=['PUT'])
def update_skill(skill_id):
    skill = Skill.query.get(skill_id)
    if not skill:
        return jsonify({"error": "Skill not found"}), 404

    data = request.get_json()

    try:
        skill_category = SkillCategory(data.get('skill_category'))
    except ValueError:
        return jsonify({"error": "Invalid skill_category"}), 400

    try:
        skill_subcategory = SkillSubcategory(data.get('skill_subcategory'))
    except ValueError:
        return jsonify({"error": "Invalid skill_subcategory"}), 400

    skill.skill_category = skill_category
    skill.skill_subcategory = skill_subcategory
    db.session.commit()

    return jsonify(skill.serialize()), 200
