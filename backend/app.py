from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///geoflow_tasks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200), nullable=False)

@app.route('/')
def home():
    return "Welcome to GeoFlow Task App!"

@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([task.description for task in tasks])

@app.route('/add-task', methods=['POST'])
def add_task():
    data = request.json
    description = data.get('description')

    if not description:
        return jsonify({"message": "Description is required!"}), 400

    new_task = Task(description=description)
    db.session.add(new_task)
    db.session.commit()

    return jsonify({"message": "Task added successfully!"})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
