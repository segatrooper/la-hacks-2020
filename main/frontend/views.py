from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
import csv
from .forms import UploadFileForm
import json, mimetypes
import os
# Create your views here.

def home(request):
    return render(request, 'frontend/index.html', context={'name': 'main'})


def tp(request):
    if request.method == 'POST':
        print("went through post")
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            print('this form went through')
            chunky = request.FILES['file'].read()
            # print(chunky)
            s = str(chunky)
            s = s.split('\\r\\n')
            s_new = []
            for index, row in enumerate(s):
                s_new.append(row.split('\",\"'))
                for a, b in enumerate(s_new[index]):
                    s_new[index][a] = b.replace('\"', '')
            print(json.dumps(s_new, indent=4))
            return render(request, 'frontend/index.html', {'tp': s_new})
    else:
        print('nope')
        form = UploadFileForm()
    # print(form)
    return render(request, 'frontend/index.html', context={'name': 'tp', 'form': form})


def download_file(request):
    print(os.getcwd())
    # fill these variables with real values
    fl_path = 'frontend/static/'
    filename = 'costco.csv'
    fl = open(fl_path + filename, 'r')
    # mime_type, _ = mimetypes.guess_type(fl_path)
    response = HttpResponse(fl, content_type='text/csv')
    response['Content-Disposition'] = "attachment; filename=%s" % filename
    return response