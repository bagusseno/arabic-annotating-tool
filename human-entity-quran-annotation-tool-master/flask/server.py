from flask import Flask, jsonify, json, g, request
from flask_cors import CORS
from flask_pymongo import PyMongo, ObjectId
from bson.json_util import dumps
import sys
import json
import os

sys.path.insert(1, 'library/')
from arabic_entity_classifier_using_pattern import classify, classify_suggest

app = Flask(__name__)
app.config['MONGO_URI'] = "mongodb://127.0.0.1:27017/annotation_tool"
CORS(app)

mongo = PyMongo(app)

@app.route('/API/get_surah/<surah_number>')
def get_surah(surah_number):

    def pattern_to_array(row):
        return row['pattern'].split(',')

    patterns = list(map(pattern_to_array, list(mongo.db.patterns.find())))
    surah = list(mongo.db.quran.find({'SURAH_NUMBER': str(surah_number)}))

    classified_surah = jsonify(classify_suggest(patterns, surah))

    return classified_surah


@app.route('/API/new_project')
def new_project():

    project_type = request.args.get('project_type')
    project_annotator = request.args.get('project_annotator')
    surah_number = request.args.get('surah_number')

    query = mongo.db.projects.insert({
        'projectType': project_type,
        'projectAnnotator': project_annotator,
        'surahNumber': surah_number,
        'chosenEntities': []
    })

    return dumps(query)


@app.route('/API/get_project/<project_id>')
def get_project(project_id):

    # project_id = request.args.get('project_id')
    project_data = mongo.db.projects.find({'_id': ObjectId(project_id)})

    return dumps(project_data)


@app.route('/API/save_project', methods=['post'])
def save_project():

    print(request)

    projectID = request.json['projectID']
    chosenEntities = request.json['chosenEntities']

    print(projectID)

    query = mongo.db.projects.update_one(
        {'_id': ObjectId(projectID)},
        {'$set':
            {
                "chosenEntities": chosenEntities
            }
         }
    )

    print(query)

    if(query.matched_count > 0):
        return "success"
    else:
        return "failed"


@app.route('/API/get_projects')
def get_projects():

    projects = mongo.db.projects.find(
        {"projectAnnotator": {
            "$ne": ""
        }
        })

    return dumps(projects)


@app.route('/API/delete_project/<project_id>', methods=['delete'])
def delete(project_id):

    query = mongo.db.projects.delete_one({'_id': ObjectId(project_id)})
    print(query)
    projects = mongo.db.projects.find(
        {"_id": {
            "$ne": ""
        }
        })

    return dumps(projects)
