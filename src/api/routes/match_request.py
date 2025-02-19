from flask import Blueprint, jsonify, request

from api.models import db, MatchRequest

match_requests_bp = Blueprint('match_requests_bp', __name__)

@match_requests_bp.route('/match-requests', methods=['POST'])
def create_match_request():
    data = request.get_json()
    sender_id = data.get('sender_id')
    receiver_id = data.get('receiver_id')

    if not sender_id or not receiver_id:
        return jsonify({"error": "Missing required fields"}), 400

    match_request = MatchRequest(sender_id=sender_id, receiver_id=receiver_id)
    db.session.add(match_request)
    db.session.commit()

    return jsonify(match_request.serialize()), 201
