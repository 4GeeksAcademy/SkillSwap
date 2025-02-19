from flask import Blueprint, request, jsonify

from api.models import db, Message

messages_bp = Blueprint('messages_bp', __name__)

@messages_bp.route('/messages', methods=['POST'])
def create_message():
    data = request.get_json()
    conversation_id = data.get('conversation_id')
    sender_id = data.get('sender_id')
    message_text = data.get('message_text')

    if not conversation_id or not sender_id or not message_text:
        return jsonify({"error": "Missing required fields"}), 400

    message = Message(conversation_id=conversation_id, sender_id=sender_id, message_text=message_text)
    db.session.add(message)
    db.session.commit()

    return jsonify(message.serialize()), 201

@messages_bp.route('/messages/<int:conversation_id>', methods=['GET'])
def get_messages(conversation_id):
    messages = Message.query.filter_by(conversation_id=conversation_id).all()
    return jsonify([message.serialize() for message in messages])
