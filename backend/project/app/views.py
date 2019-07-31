from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Note,User,LocationLog
from django.http import HttpResponse,HttpRequest, JsonResponse
from .serializers import NoteSerializer,LocationSerializer
from django.contrib.auth import authenticate

class login(APIView):

	def post(self, request, format=None):
		username = request.data['username']
		password = request.data['password']

		user = authenticate(username=username, password=password)

		if user is not None:
			print("correct")
			return JsonResponse({"username":username})
		else:
			print("incorrect username/password")
			return JsonResponse({})

class addNote(APIView):

	def post(self, request, format=None):
		user =  User.objects.get( username = request.data['username'] )
		content = request.data['note']
		note = Note(content=content, username=user)

		note.save()
		print("note saved")

		return JsonResponse({"response":"note saved"})

class location(APIView):
    def post(self, request,format=None):
        user =  User.objects.get( username = request.data['username'] )
        lng = request.data['lng']
        lat = request.data['lat']
        locationlog = LocationLog(username=user,lat=lat,lng=lng)

        locationlog.save()
        print("location saved")
        return JsonResponse({"response": "location saved"})