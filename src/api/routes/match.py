from flask import Blueprint, jsonify, request

from api.models import db, Match

matches_bp = Blueprint('matches_bp', __name__)

@matches_bp.route('/matches', methods=['POST'])
def create_match():
    data = request.get_json()
    user_1_id = data.get('user_1_id')
    user_2_id = data.get('user_2_id')

    if not user_1_id or not user_2_id:
        return jsonify({"error": "Missing required fields"}), 400

    match = Match(user_1_id=user_1_id, user_2_id=user_2_id)
    db.session.add(match)
    db.session.commit()

    return jsonify(match.serialize()), 201

@matches_bp.route('/matches/<int:user_id>', methods=['GET'])
def get_matches(user_id):
    matches = Match.query.filter((Match.user_1_id == user_id) | (Match.user_2_id == user_id)).all()
    return jsonify([match.serialize() for match in matches])
