import asyncio
import asgiref
from flask import Flask, request, jsonify
import json
from os import environ
from PDFDataExtractor.pdfdataextractor import Reader
from chemdataextractor import Document

app = Flask(__name__)

@app.route("/pdfextract/api/v1.0/extract", methods=['POST'])
def extract_pdf():
    data = request.get_data()
    jsonData = json.loads(data.decode('utf-8'))
    papers = jsonData['papers']
    file = Reader()
    for paper in papers:
        path = paper['pLink']
        pdf = file.read_file(path)
        print("caption: ", pdf.caption())
        print("title: ", pdf.title())
        print("title: ", pdf.abstract())
        print("title: ", pdf.journal())
        pdfText = pdf.plaintext() 
        file_name = paper['_id'] + "test.txt"
        with open(file_name, "w") as fo:
            fo.write(pdfText)
        data1 = pdf.title()
        paper['pTitle'] = data1
    print("papers 2: ", papers)
    return {"papers": papers}

@app.route("/pdfextract/api/v1.0/extract2", methods=['GET'])
def extract2_pdf():
    path = r'./1-s2.0-S2405829722005475-main.pdf'
    f = open(path, 'rb')
    doc = Document.from_file(f)
    print(doc.elements)
    return {"results":"success"}

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=9000)



