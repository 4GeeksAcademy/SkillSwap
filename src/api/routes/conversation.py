from flask import Blueprint, request, jsonify

from api.models import db, Conversation, Message

conversation_bp = Blueprint('conversation_bp', __name__)

@conversation_bp.route('/conversation', methods=['POST'])
def create_conversation():
    data = request.get_json()
    user_1_id = data.get('sender_id')
    user_2_id = data.get('user_2_id')
    first_message_content = data.get('message')

    if not user_1_id or not user_2_id or not first_message_content:
        return jsonify({"error": "Missing user_ids or first_message"}), 400

    conversation = Conversation(user_1_id=user_1_id, user_2_id=user_2_id)
    db.session.add(conversation)
    db.session.commit()

    first_message = Message(conversation_id=conversation.id, sender_id=user_1_id, message_text=first_message_content)
    db.session.add(first_message)
    db.session.commit()

    return jsonify({"conversation_id": conversation.id, "first_message_id": first_message.id}), 201

@conversation_bp.route('/conversation/<int:user_id>', methods=['GET'])
def get_conversation_by_user(user_id):
    conversations = Conversation.query.filter_by(user_1_id=user_id).all()
    conversations += Conversation.query.filter_by(user_2_id=user_id).all()

    return jsonify([conversation.serialize() for conversation in conversations]), 200
