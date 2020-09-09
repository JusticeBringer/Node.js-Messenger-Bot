const getHeader = require('./headerController');

describe('getHeader', () => {
	const req = {
	  params: { body: `<div id="header-wrap">
							<div class="row barLooks">
								<div class="fit10 fltLeft"><p/></div>
								<div class="fit80 fltLeft">
									<nav>
										<ul class="menu" id="">
											<li>  <a href="#" class="big-name"> Messenger Bot </a> </li>
										</ul>
									</nav>
								</div>
								<div class="fit10 fltLeft">
									<p/>
								</div>
							</div>
						</div>` 
				}
	};
  
	const res = {
	  render: jest.fn()
	};

	beforeAll(() => {
		getHeader(req, res);
	});
  
	describe('returning header', () => {
		beforeAll(() => {
			res.render.mockClear();
			getHeader(req, res);
		});

		it('should call res.render', () => {
			expect(res.render).toHaveBeenCalledWith('partials/header.ejs');
		})
	});
  
	describe('not returning header', () => {
		beforeAll(() => {
			res.render.mockClear();
		});

		it('should not call res.render', () => {
			expect(res.render).not.toHaveBeenCalled();
		});
	});
  });