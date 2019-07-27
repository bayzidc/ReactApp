from django.urls import path

from . import views

urlpatterns = [
	#path('/', addNote.as_view())
	path('login/', views.login.as_view(), name='login'),
    path('add_note/', views.addNote.as_view(), name='note'),
    path('locationlog/', views.location.as_view(), name='locationlog'),
   
]
