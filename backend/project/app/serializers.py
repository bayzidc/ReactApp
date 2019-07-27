from rest_framework import serializers

from .models import Note,LocationLog


class NoteSerializer(serializers.ModelSerializer):
	class Meta:
		model = Note
		fields = ['content','username']

class LocationSerializer(serializers.ModelSerializer):
	class Meta:
		model = LocationLog
		fields = ['lat','lng','username']
