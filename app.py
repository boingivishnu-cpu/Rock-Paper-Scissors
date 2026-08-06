from flask import Flask, render_template, request, session, jsonify
import random

app = Flask(__name__)
app.secret_key = "rock_paper_scissors_secret_key"

CHOICES = {
    "rock": "🪨 Rock",
    "paper": "📄 Paper",
    "scissors": "✂️ Scissors"
}


def get_winner(user, computer):
    if user == computer:
        return "Tie"

    if (
        (user == "rock" and computer == "scissors") or
        (user == "paper" and computer == "rock") or
        (user == "scissors" and computer == "paper")
    ):
        return "You Win"

    return "Computer Wins"


@app.route("/")
def index():

    if "user_score" not in session:
        session["user_score"] = 0
        session["computer_score"] = 0
        session["tie_score"] = 0
        session["round"] = 0

    return render_template(
        "index.html",
        user_score=session["user_score"],
        computer_score=session["computer_score"],
        tie_score=session["tie_score"],
        round=session["round"]
    )


@app.route("/play", methods=["POST"])
def play():

    data = request.get_json()

    user_choice = data.get("choice")

    computer_choice = random.choice(list(CHOICES.keys()))

    result = get_winner(user_choice, computer_choice)

    session["round"] += 1

    if result == "You Win":
        session["user_score"] += 1

    elif result == "Computer Wins":
        session["computer_score"] += 1

    else:
        session["tie_score"] += 1

    return jsonify({

        "user_choice": CHOICES[user_choice],
        "computer_choice": CHOICES[computer_choice],
        "result": result,

        "user_score": session["user_score"],
        "computer_score": session["computer_score"],
        "tie_score": session["tie_score"],
        "round": session["round"]

    })


@app.route("/reset", methods=["POST"])
def reset():

    session["user_score"] = 0
    session["computer_score"] = 0
    session["tie_score"] = 0
    session["round"] = 0

    return jsonify({"message": "Game Reset Successfully"})


if __name__ == "__main__":
    app.run(debug=True)