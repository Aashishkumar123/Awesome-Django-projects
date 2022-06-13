from django.contrib import admin
from main.models import List

@admin.register(List)
class ListAdmin(admin.ModelAdmin):
    list_display = ['id','title','date']
    

