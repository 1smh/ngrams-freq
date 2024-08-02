from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

API_URL = "https://api.ngrams.dev"

def get_ngram_data(corpus, ngram):
    response = requests.get(f"{API_URL}/{corpus}/search?query={ngram}")
    return response.json()

@app.route('/compare_ngram', methods=['GET'])
def compare_ngram():
    ngram = request.args.get('ngram')
    languages = ['eng', 'ger', 'rus']
    results = []

    for lang in languages:
        data = get_ngram_data(lang, ngram)
        if 'ngrams' in data and data['ngrams']:
            ngram_data = data['ngrams'][0]
            results.append({
                'Language': lang,
                'Ngram': ngram_data['tokens'][0]['text'],
                'Total Matches': ngram_data['absTotalMatchCount'],
                'Relative Matches': ngram_data['relTotalMatchCount']
            })

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
