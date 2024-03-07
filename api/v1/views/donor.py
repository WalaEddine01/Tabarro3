#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Donors """
from models.donor import Donor
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from


@app_views.route('/donors', methods=['GET'], strict_slashes=False)
@swag_from('documentation/donor/all_donors.yml', methods=['GET'])
def get_donors():
    """
    Retrieves the list of all donor objects
    or a specific donor
    """
    donors = storage.all(Donor).values()
    donors = [donor.to_dict() for donor in donors]
    return jsonify(donors)


@app_views.route('/donors/<donor_id>', methods=['GET'], strict_slashes=False)
@swag_from('documentation/donor/get_donor.yml', methods=['GET'])
def get_donor(donor_id):
    """ Retrieves a donor """
    donor = storage.get(Donor, donor_id)
    if not donor:
        abort(404)

    return jsonify(donor.to_dict())


@app_views.route('/donors/<donor_id>', methods=['DELETE'],
                 strict_slashes=False)
@swag_from('documentation/donor/delete_donor.yml', methods=['DELETE'])
def delete_donor(donor_id):
    """
    Deletes a donor Object
    """
    donor = storage.get(Donor, donor_id)
    if not donor:
        abort(404)

    storage.delete(donor)
    storage.save()
    return make_response(jsonify({}), 200)


@app_views.route('/donors', methods=['POST'], strict_slashes=False)
@swag_from('documentation/donor/post_donor.yml', methods=['POST'])
def post_donor():
    """
    Creates a donor
    """
    if not request.get_json():
        abort(400, description="Not a JSON")
    if 'name' not in request.get_json():
        abort(400, description="Missing name")
    if 'age' not in request.get_json():
        abort(400, description="Missing age")
    if 'gender' not in request.get_json():
        abort(400, description="Missing gender")
    if 'blod_group' not in request.get_json():
        abort(400, description="Missing blod_group")
    if 'location' not in request.get_json():
        abort(400, description="Missing location")
    if 'phone_number' not in request.get_json():
        abort(400, description="Missing phone_number")

    data = request.get_json()
    donor = Donor(**data)
    storage.new(donor)
    storage.save()
    return make_response(jsonify(data), 201)


@app_views.route('/donors/<donor_id>', methods=['PUT'], strict_slashes=False)
@swag_from('documentation/donor/put_donor.yml', methods=['PUT'])
def put_donor(donor_id):
    """
    Updates a donor
    """
    donor = storage.get(Donor, donor_id)
    if not donor:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    for key, value in data.items():
        if key not in ['id', 'phone_number']:
            setattr(donor, key, value)
    storage.save()
    return make_response(jsonify(donor.to_dict()), 200)