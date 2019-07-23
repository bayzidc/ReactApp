from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Note,User
from django.http import HttpResponse,HttpRequest, JsonResponse
from .serializers import NoteSerializer
from django.contrib.auth import authenticate

class login(APIView):

	def post(self, request, format=None):
		serializer = NoteSerializer(data=request.data)
		username = request.data['username']
		password = request.data['password']

		user = authenticate(username=username, password=password)

		if user is not None:
			print("correct")
			return JsonResponse({"username":username})
		else:
			print("incorrect")
			return JsonResponse({})

class addNote(APIView):

	def post(self, request, format=None):
		user =  User.objects.get( username = request.data['username'] )
		content = request.data['note']
		note = Note(content=content, username=user)

		note.save()
		print("saved")

		return JsonResponse({"response":"saved"})
