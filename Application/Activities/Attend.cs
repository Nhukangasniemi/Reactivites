using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Attend
    {
        public class Command : IRequest
                {
        
                }
        
                public class Handler : IRequestHandler<Command>
                {
                    private readonly DataContext _context;
        
                    public Handler(DataContext context)
                    {
                        _context = context;
                    }
        
                    public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
                    {
                        // handler logic goes here
                        var success = await _context.SaveChangesAsync() > 0;
                        if(success) return Unit.Value;
                        throw new Exception("Problem saving changes");
                    }
                }
    }
}