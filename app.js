// 載入express模組
const express = require('express')
const app = express()

// 載入樣板模組
const exphbs = require('express-handlebars')
    // 載入JSON檔
const movieList = require('./movies.json')

// 定義伺服器相關變數
const port = 3000

// 告知Express存取靜態檔案的位置
app.use(express.static('public'))

// 告知Express要使用express-handlebars這個模板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定路由，傳送畫面渲染回應
app.get('/', function(req, res) {

    res.render('index', { movies: movieList.results })
})

app.get('/search', function(req, res) {
    console.log("req", req.query.keyword)
    const movieSearch = movieList.results.filter(function(movie) {
        return movie.title.toLowerCase().includes(req.query.keyword.toLowerCase())
    })
    res.render('index', { movies: movieSearch, keywords: req.query.keyword })
})


app.get('/movies/:movie_id', function(req, res) {

    console.log(req.params.movie_id)

    /*
    let movieSelected = []
    for (let i = 0; i < movieList.results.length; i++) {
        if (req.params.movie_id == movieList.results[i].id) {
            movieSelected = movieList.results[i]
        }
    }
    */

    const movieSelected = movieList.results.filter(function(movie) {
        return movie.id == req.params.movie_id
    })

    console.log(movieSelected)

    res.render('show', { movie: movieSelected[0] })
})

// 啟動伺服器
app.listen(port, function() {
    console.log(`Express is running on http://localhost:${port}`)
})