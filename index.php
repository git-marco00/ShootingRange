<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,
        initial-scale=1.0">
    <title>
        SHOOTING RANGE
    </title>
    <link rel="icon" href="others/SR.png">
    <link rel="stylesheet" href="css/styleIndex.css">
    <script src="js/index.js" defer></script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
</head>

<body id="wrapper" >

    <div id="navBar">
        <?php
            if(isset($_SESSION['userId'])){
                echo '<p class="formMessage">Welcome '.$_SESSION['userUId']."!";
                // conferma del login
                if (isset($_GET['login'])){
                    if($_GET['login']=="success"){
                        echo '<p class="loginsuccess">Login successfull!</p>';
                    }
                }
                // comparsa bottone logout
                echo '<form id="logoutForm" action="php/logout.php" method="POST">
                            <button id="logout" type="submit" name="logout-submit">Logout</button>
                        </form>';
            }
            else {
                // errori nel login
                echo '<p class="formMessage">You are not logged in! </p>';
                if(isset($_GET['logerror'])){
                    switch($_GET['logerror']){
                        case "emptyfields":
                            echo '<p class="loginerror">Fill in all the fields!</p>';
                            break;
                        case "wrongpassword":
                            echo '<p class="loginerror">Wrong password!</p>';
                            break;
                        case "nouser":
                            echo '<p class="loginerror">Wrong username!</p>';
                            break;
                        case "sqlerror":
                            echo '<p class="loginerror">SQLerror during login.</p>';
                            break;
                    }
                }
                // errori nel signup
                if(isset($_GET['error'])){
                    switch($_GET['error']){
                        case "invalidemailuid":
                            echo '<p class="signuperror">Invalid email & invalid Username!</p>';
                            break;
                        case "invalidemail":
                            echo '<p class="signuperror">Invalid email!</p>';
                            break;
                        case "invaliduid":
                            echo '<p class="signuperror">Invalid Username!</p>';
                            break;
                        case "passwordcheck":
                            echo '<p class="signuperror">Passwords are different!</p>';
                            break;
                        case "sqlerror":
                            echo '<p class="signuperror">SQLerror during signup.</p>';
                            break;
                        case "usertaken":
                            echo '<p class="signuperror">Username already taken!</p>';
                            break;
                    }
                }

                // conferma del signUp
                if (isset($_GET['signup'])){
                    if($_GET['signup']=="success"){
                        echo '<p class="signupsuccess">Signup successfull!</p>';
                    }
                }

                echo '<button id="login">Login</button>
                <button id="signUp">Sign Up</button>';
            }
        ?>
    </div>


    <div id="loginDiv">
        <img src="others/close.png" id="imgCloseLogin" alt="img close">
        <br>
        <p class=formTitle>
        LOGIN
        </p>
        <br>
        <form action="php/login.php" method="POST">
            <input class="input" type="text" name="uid" placeholder="Username" required><br><br>
            <input class="input" type="password" name="pwd" placeholder="Password" required><br><br>
            <button  class="formButton" type="submit" name="login-submit">Login</button><br><br>
        </form>
    </div>

    <div id="signUpDiv">
        <img src="others/close.png" id="imgCloseSignUp" alt="img close">
        <br>
        <p class=formTitle>
        SIGNUP
        </p> 
        <form action="php/signup.php" method="POST">
            <input class="input" type="text" name="uid" placeholder="Username" required><br><br>
            <input class="input" type="text" name="mail" placeholder="E-mail" required><br><br>
            <input class="input" type="password" name="pwd" placeholder="Password" required><br><br>
            <input class="input" type="password" name="pwd-repeat" placeholder="Confirm Password" required><br><br>
            <button class="formButton" type="submit" name="signup-submit">SignUp</button><br><br>
        </form>
    </div>
    
    
    <div id=wrapper1>
    <h1>
        SHOOTING RANGE
    </h1>
    <blockquote>
        <p>
        Speed and reaction time, eternal subjects of interest for players who want to improve their gaming skills,
        the type of skills that can also prove very useful even in your everyday life. These capacities can be honed and improved if
        you play competitive games regularly in a way that builds and trains your
        <a href="https://en.wikipedia.org/wiki/Muscle_memory">muscle memory</a>, which is the dwelling place of your gaming habits (good and bad)
        acquired by the repetition of various moves and actions.
        </p>
        <p>
            The human brain is complex, it’s a science. 3 types of memories are generally accepted by scientists: 
        </p>
    <ul>
        <li><a href="https://en.wikipedia.org/wiki/Episodic_memory">Episodic memory</a><br>
        That of the events of our lives, linked to a specific date, a precise place.<br><br></li>
        <li><a href="https://en.wikipedia.org/wiki/Semantic_memory">Semantic memory</a><br>
        That of knowledge. It is the memory of words, numbers, all the general information…<br><br></li>
        <li><a href="https://en.wikipedia.org/wiki/Procedural_memory">Procedural memory</a>
        <br> 
        That which is used for practical things. Walking, cycling, driving, playing video games… It’s a long-term memory.
        The memories stored there are actually a combination of know-how: automatisms that we have recorded through repetition.
        The muscle or digital memory can be associated with the procedural memory described above. It corresponds to our capacity to replicate identically,
        without any prior preparation, physical action or a movement after doing it several times.
        </li>
    </ul>
        <p>
        This practice will allow you to feed your muscle memory in a way that improves your speed and reaction time.
        From a certain level of repetition, the movements will follow one another without you needing to concentrate.
        The simple act of pressing a button will make you press the next one and the next one again, it will become a habit.
        In other words, headshots will become a piece of cake for you and you will be doing them with less concentration and less effort.
        </p>
    </blockquote>
    <p><a href="https://verticalbullet.com/how-muscle-memory-is-built-when-playing-competitive-games">Article</a> by <cite>Vertical Bullet</cite></p>
    </div>
    <div id="wrapper2">
        <p class=Title>Games</p>
        <br><br>
        <div id="gameWrapper1">
            <div id="Precision">
                <h2>
                    Precision
                </h2>
                <div class="imgWrapper">
                <a href="html/precision.html"><img id="img1" src="others/gameimg/Immagine0.png" alt="image of the game" class="image"></a>
                </div>
            </div>
            <img id="infoPrecision" src="others/info.png" alt="info img">
            <div id="Reflex">
                <h2>
                    Reflex
                </h2>
                <div class="imgWrapper">
                <a href="html/reflex.html"><img id="img2" src="others/gameimg/Immagine4.png" alt="image of the game" class="image"></a>
                </div>
            </div>
            <img id="infoReflex" src="others/info.png" alt="info img">
        </div>
        <div id="gameWrapper2">
            <div id="TargetTracking">
                <h2>
                    Target Tracking
                </h2>
                <div class="imgWrapper">
                <a href="html/tracking.html"><img id="img3" src="others/gameimg/Immagine5.png" alt="image of the game" class="image"></a>
                </div>
            </div>
            <img id="infoTracking" src="others/info.png" alt="info img">
            <div id="MovingTargets">
                <h2>
                    Moving Targets
                </h2>
                <div class="imgWrapper">
                <a href="html/moving.html"><img id="img4" src="others/gameimg/Immagine8.png" alt="image of the game" class="image"></a>
                </div>
            </div>
            <img id="infoMoving" src="others/info.png" alt="info img">
        </div>
    </div>
    <div id="infoDiv">
        <img src="others/close.png" id="imgClose" alt="img close">
        <span id="infoText"></span>
    </div>
    <div id="charts">
    <br><br><br><br><br><br>
        <p class=Title>Charts</p><br><br><br>
        <div id="charts1">
        <table id="precisionTable">
            
            <tr class="thead">
                <th colspan="3">
                Precision Chart
                </th>
            </tr>
        
            <tr>
                <th class="titoloClass">Pos</th>
                <th class="titoloClass">Username</th>
                <th class="titoloClass">Score</th>
            </tr>
        </table>
        <table id="reflexTable">
        
            <tr class="thead">
                <th colspan="3">
                Reflex Chart
                </th>
            </tr>
            <tr>
            
                <th class="titoloClass">Pos</th>
                <th class="titoloClass">Username</th>
                <th class="titoloClass">Score</th>
            </tr>
        </table>
        </div>
        <div id="charts2">
        <table id="trackingTable">
        
            <tr class="thead">
                <th colspan="3">
                Target Tracking Chart
                </th>
            </tr>
            <tr>
            
                <th class="titoloClass">Pos</th>
                <th class="titoloClass">Username</th>
                <th class="titoloClass">Score</th>
            </tr>
        </table>
        <table id="movingTable">
        
            <tr class="thead">
                <th colspan="3">
                Moving Target Chart
                </th>
            </tr>
            <tr>
            
                <th class="titoloClass">Pos</th>
                <th class="titoloClass">Username</th>
                <th class="titoloClass">Score</th>
            </tr>
        </table>
        </div>
    </div>
</body>