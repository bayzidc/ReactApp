from rest_framework import serializers

from .models import Note

#class UserSerializer(serializers.ModelSerializer):
	#class Meta:

class NoteSerializer(serializers.ModelSerializer):
	class Meta:
		model = Note
		fields = ['content','username']
