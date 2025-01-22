const chai = require('chai');
const assert = chai.assert;

const { LOCALES, translate } = require('../components/translator.js');


suite("Unit Tests", () => {

    const toBritish = (text) => translate(text, LOCALES.AMERICAN_TO_BRITISH);
    const toAmerican = (text) => translate(text, LOCALES.BRITISH_TO_AMERICAN)

    suite("Translate to British English", function () {

        test("Translate Mangoes are my favorite fruit. to British English", function (done) {
            assert.equal(
                toBritish("Mangoes are my favorite fruit.").text,
                "Mangoes are my favourite fruit."
            );
            done();
        });

        test("Translate I ate yogurt for breakfast. to British English", function (done) {
            assert.equal(
                toBritish("I ate yogurt for breakfast.").text,
                "I ate yoghurt for breakfast."
            );
            done();
        });

        test("Translate We had a party at my friend's condo. to British English", function (done) {
            assert.equal(
                toBritish("We had a party at my friend's condo.").text || '',
                "We had a party at my friend's flat."
            );
            done();
        });

        test("Translate Can you toss this in the trashcan for me? to British English", function (done) {
            assert.equal(
                toBritish(
                    "Can you toss this in the trashcan for me?"
                ).text,
                "Can you toss this in the bin for me?"
            );
            done();
        });

        test("Translate The parking lot was full. to British English", function (done) {
            assert.equal(
                toBritish("The parking lot was full.").text,
                "The car park was full."
            );
            done();
        });

        test("Translate Like a high tech Rube Goldberg machine. to British English", function (done) {
            assert.equal(
                toBritish(
                    "Like a high tech Rube Goldberg machine."
                ).text,
                "Like a high tech Heath Robinson device."
            );
            done();
        });

        test("Translate To play hooky means to skip class or work. to British English", function (done) {
            assert.equal(
                toBritish(
                    "To play hooky means to skip class or work."
                ).text,
                "To bunk off means to skip class or work."
            );
            done();
        });

        test("Translate No Mr. Bond, I expect you to die. to British English", function (done) {
            assert.equal(
                toBritish("No Mr. Bond, I expect you to die.").text,
                "No Mr Bond, I expect you to die."
            );
            done();
        });

        test("Translate Dr. Grosh will see you now. to British English", function (done) {
            assert.equal(
                toBritish("Dr. Grosh will see you now.").text,
                "Dr Grosh will see you now."
            );
            done();
        });

        test("Translate Lunch is at 12:15 today. to British English", function (done) {
            assert.equal(
                toBritish("Lunch is at 12:15 today.").text,
                "Lunch is at 12.15 today."
            );
            done();
        });

    });

    suite("Translate to American English", function () {
        
        test("Translate We watched the footie match for a while. to American English", function (done) {
            assert.equal(
                toAmerican(
                    "We watched the footie match for a while."
                ).text,
                "We watched the soccer match for a while."
            );
            done();
        });
        
        test("Translate Paracetamol takes up to an hour to work. to American English", function (done) {
            assert.equal(
                toAmerican(
                    "Paracetamol takes up to an hour to work."
                ).text,
                "Tylenol takes up to an hour to work."
            );
            done();
        });
        
        test("Translate First, caramelise the onions. to American English", function (done) {
            assert.equal(
                toAmerican("First, caramelise the onions.").text,
                "First, caramelize the onions."
            );
            done();
        });
        
        test("Translate I spent the bank holiday at the funfair. to American English", function (done) {
            assert.equal(
                toAmerican(
                    "I spent the bank holiday at the funfair."
                ).text,
                "I spent the public holiday at the carnival."
            );
            done();
        });
        
        test("Translate I had a bicky then went to the chippy. to American English", function (done) {
            assert.equal(
                toAmerican(
                    "I had a bicky then went to the chippy."
                ).text,
                "I had a cookie then went to the fish-and-chip shop."
            );
            done();
        });
        
        test("Translate I've just got bits and bobs in my bum bag. to American English", function (done) {
            assert.equal(
                toAmerican(
                    "I've just got bits and bobs in my bum bag."
                ).text,
                "I've just got odds and ends in my fanny pack."
            );
            done();
        });
        
        test("Translate The car boot sale at Boxted Airfield was called off. to American English", function (done) {
            assert.equal(
                toAmerican(
                    "The car boot sale at Boxted Airfield was called off."
                ).text,
                "The swap meet at Boxted Airfield was called off."
            );
            done();
        });
        
        test("Translate Have you met Mrs Kalyani? to American English", function (done) {
            assert.equal(
                toAmerican("Have you met Mrs Kalyani?").text,
                "Have you met Mrs. Kalyani?"
            );
            done();
        });
        
        test("Translate Prof Joyner of King's College, London. to American English", function (done) {
            assert.equal(
                toAmerican(
                    "Prof Joyner of King's College, London."
                ).text,
                "Prof. Joyner of King's College, London."
            );
            done();
        });
        
        test("Translate Tea time is usually around 4 or 4.30. to American English", function (done) {
            assert.equal(
                toAmerican(
                    "Tea time is usually around 4 or 4.30."
                ).text,
                "Tea time is usually around 4 or 4:30."
            );
            done();
        });

    });

    suite("Highlight Translation", function () {

        test("Highlight translation in Mangoes are my favorite fruit.", function (done) {
            assert.equal(
                toBritish(
                    "Mangoes are my favorite fruit."
                ).html,
                'Mangoes are my <span class="highlight">favourite</span> fruit.'
            );
            done();
        });

        test("Highlight translation in I ate yogurt for breakfast.", function (done) {
            assert.equal(
                toBritish("I ate yogurt for breakfast.").html,
                'I ate <span class="highlight">yoghurt</span> for breakfast.'
            );
            done();
        });

        test("Highlight translation in We watched the footie match for a while.", function (done) {
            assert.equal(
                toAmerican(
                    "We watched the footie match for a while."
                ).html,
                'We watched the <span class="highlight">soccer</span> match for a while.'
            );
            done();
        });

        test("Highlight translation in Paracetamol takes up to an hour to work.", function (done) {
            assert.equal(
                toAmerican(
                    "Paracetamol takes up to an hour to work."
                ).html,
                '<span class="highlight">Tylenol</span> takes up to an hour to work.'
            );
            done();
        });

    });
});