from flask import Blueprint, jsonify, request
from api.models import db, Match, MatchRequest, User

matches_bp = Blueprint('matches_bp', __name__)

@matches_bp.route('/match', methods=['POST'])
def create_match():
    data = request.get_json()
    user_1_id = data.get('user_1_id')
    user_2_id = data.get('user_2_id')
    match_request_id = data.get('match_request_id')

    if not user_1_id or not user_2_id:
        return jsonify({"error": "Missing required fields"}), 400

    match = Match(user_1_id=user_1_id, user_2_id=user_2_id)
    db.session.add(match)

    if match_request_id:
        match_request = MatchRequest.query.get(match_request_id)
        if match_request:
            db.session.delete(match_request)

    db.session.commit()

    return jsonify(match.serialize()), 201

@matches_bp.route('/matches/<int:user_id>', methods=['GET'])
def get_matches(user_id):
    matches = Match.query.filter((Match.user_1_id == user_id) | (Match.user_2_id == user_id)).all()
    result = []
    for match in matches:
        other_user_id = match.user_1_id if match.user_1_id != user_id else match.user_2_id
        other_user = User.query.get(other_user_id)
        data = match.serialize()
        data["friend"] = other_user.serialize() if other_user else {}
        result.append(data)
    return jsonify(result), 200