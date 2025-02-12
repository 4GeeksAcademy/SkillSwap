from flask import Blueprint, jsonify, request

from api.models import db, User, Skill, Match, Conversation

feed_bp = Blueprint('feed_bp', __name__)

@feed_bp.route('/feed/<int:user_id>', methods=['GET'])
def get_feed(user_id):
    users = User.query.filter(User.id != user_id).all()
    feed = []
    
    for user in users:
        user_data = user.serialize()
        skills = Skill.query.filter_by(user_id=user.id).all()
        skills_data = [skill.serialize() for skill in skills]
        
        is_matched = Match.query.filter(
            ((Match.user_1_id == user_id) & (Match.user_2_id == user.id)) |
            ((Match.user_1_id == user.id) & (Match.user_2_id == user_id))
        ).first() is not None
        
        conversation = Conversation.query.filter(
            ((Conversation.user_1_id == user_id) & (Conversation.user_2_id == user.id)) |
            ((Conversation.user_1_id == user.id) & (Conversation.user_2_id == user_id))
        ).first()
        
        conversation_id = conversation.id if conversation else False
        
        feed.append({
            "user": user_data,
            "skills": skills_data,
            "is_matched": is_matched,
            "conversation": conversation_id
        })
    
    return jsonify(feed), 200
