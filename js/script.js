$(function () {
  gsap.registerPlugin(ScrollTrigger);
  // 대상을 변수에 저장
  const $progressBar = $('.progress-bar');
  const $window = $(window);
  const $document = $(document);

  // 브라우저 세로 창크기, 문서의 세로 크기값 구하기
  const winHeight = $window.outerHeight();
  const docHeight = $document.outerHeight();
  const scrollHeight = docHeight - winHeight;
  // console.log(winHeight, docHeight);

  // 스크롤 이벤트가 발생할 때
  $window.on('scroll', function () {
    const scrollTop = $(this).scrollTop();

    // 스크롤 영역: 문서 크기에서 창 크기를 제외한 나머지--> 비율을 구하는 기준
    // docHeight - winHeight

    // 비율을 구하는 공식: 타켓/컨텍스트(기준)--> 결과값 * 100
    const percent = (scrollTop / (docHeight - winHeight)) * 100 + '%';

    // $progressBar의 가로 크기값으로 적용
    $progressBar.css('width', percent);
  });

  //  GNB의 색상
  // window.addEventListener('scroll', function () {
  //   const sections = document.querySelectorAll('.section');
  //   const gnb = document.querySelector('.gnb');

  //   sections.forEach((section) => {
  //     const rect = section.getBoundingClientRect();
  //     if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
  //       const sectionId = section.getAttribute('id');
  //       gnb.className = `gnb ${sectionId}`;
  //     }
  //   });
  // });

  // portfolio
  const contact = document.querySelector('.contact');
  const lastCard = document.querySelector('.card.scroll');
  const pinnedDivs = gsap.utils.toArray('.pinned');
  const btnPortfolio = $('.btn-portfolio');

  pinnedDivs.forEach((div, index, divs) => {
    let img = div.querySelector('.p-img');

    let nextDiv = divs[index + 1] || lastCard;
    let endScalePoint = `top+=${nextDiv.offsetTop - div.offsetTop} top`;

    gsap.to(div, {
      scrollTrigger: {
        trigger: div,
        start: 'top top',
        end: index === divs.length ? `+=${lastCard.offsetHeight / 2}` : contact.offsetTop - window.innerHeight,
        pin: true,
        pinSpacing: false,
        scrub: 1,
      },
    });

    const start = document.querySelector('.start').offsetTop;
    console.log(start);

    gsap.to('#portfolio', {
      scrollTrigger: {
        trigger: '#portfolio',
        markers: true,
        // start: '700px top',
        start: `${start} top`,
        end: '90% top',
        toggleClass: {
          targets: btnPortfolio,
          className: 'active',
        },
      },
    });

    gsap.fromTo(
      img,
      { scale: 1 },
      {
        scale: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: div,
          start: 'top top',
          end: endScalePoint,
          scrub: 1,
        },
      }
    );
  });

  const heroH2 = document.querySelector('.hero h2');
  // gsap.set('.hero h2', { opacity: 1 });
  ScrollTrigger.create({
    trigger: '.portfolio',
    start: 'top top',
    end: '+=300vh',
    id: 'title',
    // markers: true,
    scrub: 1,
    // toggleClass: 'active',
    onUpdate: (self) => {
      let opacityProgress = self.progress;
      // console.log(opacityProgress);
      heroH2.style.opacity = 1 - opacityProgress;
    },
  });

  // const cardDiv = document.querySelector('.');
  // ScrollTrigger.create({
  //   trigger: cardDiv,
  //   // start: 'top top',
  //   // end: '+=300vh',
  //   id: 'btn-portfolio',
  //   markers: true,
  //   // scrub: 1,
  //   toggleClass: 'active',
  // });

  $('.portfolio .hero').on('scroll', function () {
    let scrollPosition = $(this).scrollTop();
    // console.log(scrollPosition);
  });

  // console.log($('.check').offset().top);

  // $(window).on('scroll', function () {
  //   const scrollAmount = $(window).scrollTop();
  //   const checkScrollamount = $('.check').offset().top;
  //   const contactScrollamount = $('.contact').offset().top;
  //   console.log(scrollAmount);

  //   if (scrollAmount >= checkScrollamount) {
  //     btnPortfolio.addClass('active');
  //   } else {
  //     btnPortfolio.removeClass('active');
  //   }
  // });
  // portfolio f

  // 메뉴 섹션마다 색 바꾸기
  const $menu = $('.gnb > li');
  const sectionEl = gsap.utils.toArray('section');
  const liEl = gsap.utils.toArray('.gnb > li');

  ScrollTrigger.create({
    trigger: '#content',
    // markers: true,
    id: 'gnb-color',
    start: 'top 10%',
    toggleClass: {
      targets: $menu,
      className: 'active',
    },
  });

  // top버튼

  // 대상을 변수에 저장
  const $sideDot = $('.indicator button');
  const $section = $('#container > section');
  const $btnTop = $('.btn-top');

  // to버튼 숨기고 시작
  $btnTop.hide();

  // 항목별 인덱스를 활용
  let secIdx = 0;

  moveSection(secIdx);

  // top버튼을 클릭했을 때 상단으로 이동
  $btnTop.on('click', function () {
    secIdx = 0;
    moveSection(secIdx);
  });

  // 섹션을 이동하는 동작을 함수로 정의
  function moveSection(index) {
    // 인덱스를 활용해서 섹션의 위치값 구하기
    const posTop = index * $window.outerHeight();
    $('html, body').stop().animate(
      {
        scrollTop: posTop,
      },
      300
    );
    updateDot(index);
    // console.log(secIdx);

    // top버튼 보이게/숨기게
    if (secIdx >= 2) {
      $btnTop.fadeIn();
    } else {
      $btnTop.fadeOut();
    }
  }
  // 인디케이터를 클릭했을 때
  $sideDot.on('click', function () {
    secIdx = $(this).index();
    moveSection(secIdx);
  });
  // 인디케이터 업데이트 하는 함수
  function updateDot(index) {
    $sideDot.removeClass('on').eq(secIdx).addClass('on');
  }

  // 마우스 휠 & 키보드 조작 이벤트 추가
  $window.on('wheel keydown', function (e) {
    if ($('html, body').is(':animated')) return;
    if (e.originalEvent.deltaY < 0 || e.key === 'ArrowUp') {
      // 휠을 올리거나 위로가는 화살표 키를 누른 경우

      // 조건을 걸어서 코드를 종료
      if (secIdx === 0) return;

      secIdx--;
    } else if (e.originalEvent.deltaY > 0 || e.key === 'ArrowDown') {
      // 휠을 내리거나 아래 화살표 키를 누른 경우

      if (secIdx === $section.length - 1) return;
      secIdx++;
    }

    moveSection(secIdx);
  });

  // 브라우저 창이 조정될 때
  $window.on('resize', function () {
    // $window.trigger('wheel');
    moveSection(secIdx);
  });
});

// 바 색상 바꾸기
