from django.http import JsonResponse
from django.shortcuts import render
from main.models import List
from datetime import datetime


def index(request):
    list = List.objects.all()
    date = datetime.now().strftime("%Y-%m-%d")
    return render(request, "index.html", {"lists": list, "date": date})


def submitLits(request):
    title = request.POST.get("title")
    list = List(title=title)
    list.save()
    data = {"id": list.id, "title": list.title}
    return JsonResponse(data, safe=False)


def deleteList(request, id):
    List.objects.get(id=id).delete()
    return JsonResponse({"ok": True}, safe=False)


def editList(request, id):
    title = request.POST.get("title")
    edit_list = List.objects.get(id=id)
    edit_list.title = title
    edit_list.save()
    data = {"title": edit_list.title}
    return JsonResponse(data, safe=False)
