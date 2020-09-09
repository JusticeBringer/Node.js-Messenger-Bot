const getHomepage = require('./homepageController');

describe('getHomepage', () => {
	const req = {
	  params: { body: 	`<h2>Rules for conversation: </h2>
						<ul>
							<li> Greeting: "hi", "hey", "hello"</li>
							<li> Accepting: "yup", "yes", "yeah", "sure", "yep", "i do"</li>
							<li> Denying: "no", "nah", "nope", "not now", "maybe later"</li>
							<li> Gratitude: "thanks", "thx", "thank you", "thank you very much", "thanks a lot", "thanks!", "thank you!" </li>
						</ul>` 
		}
	};
  
	const res = {
	  render: jest.fn()
	};

	beforeAll(() => {
		getHomepage(req, res);
	});
  
	describe('returning homepage', () => {
		beforeAll(() => {
			res.render.mockClear();
			getHomepage(req, res);
		});

		it('should call res.render', () => {
			expect(res.render).toHaveBeenCalledWith('ejs/homepage.ejs');
		})
	});
  
	describe('not returning homepage', () => {
		beforeAll(() => {
			res.render.mockClear();
		});

		it('should not call res.render', () => {
			expect(res.render).not.toHaveBeenCalled();
		});
	});
  });