from django.urls import path
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path('', TemplateView.as_view(template_name='chatbot/chat.html'), name='chat_page'),
    path('api/chat/', views.chat_api, name='chat_api'),
]
