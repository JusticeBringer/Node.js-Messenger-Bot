const getHeadLinks = require('./headLinksController');

describe('getHeadLinks', () => {
	const req = {
	  params: { body: 	`<meta charset="UTF-8">
						<meta name="author" content="Arghire Gabriel">
						<meta name="viewport" content="width=device-width, initial-scale = 1.0, maximum-scale=1.0, user-scalable=no" />
						<meta http-equiv="X-UA-Compatible" content="IE=edge">
						<link rel="shortcut icon" type="image/ico" href="/favicon.ico" />
						
						<link rel="stylesheet" type="text/css" href="../../public/css/fonts.css"/>
						<link rel="stylesheet" type="text/css" href="../../public/css/style.css"/>` 
		}
	};
  
	const res = {
	  render: jest.fn()
	};

	beforeAll(() => {
		getHeadLinks(req, res);
	});
  
	describe('returning head links', () => {
		beforeAll(() => {
			res.render.mockClear();
			getHeadLinks(req, res);
		});

		it('should call res.render', () => {
			expect(res.render).toHaveBeenCalledWith('partials/headLinks.ejs');
		})
	});
  
	describe('not returning head links', () => {
		beforeAll(() => {
			res.render.mockClear();
		});

		it('should not call res.render', () => {
			expect(res.render).not.toHaveBeenCalled();
		});
	});
  });