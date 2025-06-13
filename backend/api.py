from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort
from flask_cors import CORS
from flask import request
import get_result

app = Flask(__name__)
cors = CORS(app, origins='*')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)
api = Api(app)

class UserModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    input = db.Column(db.String(1000), nullable=False)
    result = db.Column(db.String(1000), nullable=False)
    

    def __repr__(self):
        return f"User(id = {self.id}, input = {self.input}, result = {self.result})"
    
user_args = reqparse.RequestParser()
user_args.add_argument('input', type=str, required=True, help='Input cannot be blank')


userFields = {
    'id':fields.Integer,
    'input':fields.String,
    'result':fields.String
}

class Users(Resource):
    @marshal_with(userFields)
    def get(self):
        users = UserModel.query.all()
        return users 
    @marshal_with(userFields)
    def post(self):
        args = user_args.parse_args()
        user = UserModel(input=args["input"], result="")
        db.session.add(user)
        db.session.commit()
        return user, 201

class User(Resource):
    @marshal_with(userFields)
    def get(self, id):
        user = UserModel.query.filter_by(id=id).first()
        if not user:
            abort(404, 'User not found')
        return user 
    
    @marshal_with(userFields)
    def patch(self, id):
        data = request.get_json()
        user = UserModel.query.filter_by(id=id).first()
        if not user:
            abort(404, 'User not found')
        user.result = data["result"]
        db.session.commit()
        return user 
    
    @marshal_with(userFields)
    def delete(self, id):
        user = UserModel.query.filter_by(id=id).first()
        if not user:
            abort(404, 'User not found')
        db.session.delete(user)
        db.session.commit()
        users = UserModel.query.all()
        return users 

class script(Resource):
    def get(self, id):
        user = UserModel.query.filter_by(id=id).first()
        if not user:
            abort(404, message="User not Found")
        
        get_result.get_response_and_update(id)

        return "Script Exectued Succesfully"

api.add_resource(Users, '/api/users/')
api.add_resource(User, "/api/users/<int:id>")
api.add_resource(script, "/api/users/<int:id>/script/")

@app.route('/')
def home():
    return '<h1>Merab</h1>'


if __name__ == '__main__':
    app.run(debug=True)
