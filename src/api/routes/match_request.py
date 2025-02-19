from flask import Blueprint, jsonify, request
from api.models import db, MatchRequest, User
match_requests_bp = Blueprint('match_requests_bp', _name_)
@match_requests_bp.route('/match-requests', methods=['POST'])
def create_match_request():
    data = request.get_json()
    sender_user_id = data.get('sender_user_id')
    receiver_user_id = data.get('receiver_user_id')
    if not sender_user_id or not receiver_user_id:
        return jsonify({"error": "Missing required fields"}), 400
    match_request = MatchRequest(sender_user_id=sender_user_id, receiver_user_id=receiver_user_id)
    db.session.add(match_request)
    db.session.commit()
    return jsonify(match_request.serialize()), 201
@match_requests_bp.route('/match-requests/<int:id>', methods=['GET'])
def get_match_requests(id):
    match_requests = MatchRequest.query.filter_by(receiver_user_id=id).all()
    output = []
    for match_request in match_requests:
        sender = User.query.get(match_request.sender_user_id)
        data = match_request.serialize()
        data["sender_user"] = sender.serialize() if sender else {}
        output.append(data)
    return jsonify(output), 200